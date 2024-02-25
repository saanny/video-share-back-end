import { resolve } from 'path';

import ffmpeg from 'fluent-ffmpeg';
import compressVideoRepository from '@compress-video/repository/compressVideo.repository';
import { v4 as uuidv4 } from 'uuid';

interface GeneratedVideo {
  link: string;
  quality: number;
  userId: string;
}

interface Resolution {
  width: number | undefined;
  height: number | undefined;
}

class VideoCompressor {
  async compress(videoPath: string, userId: string): Promise<GeneratedVideo[] | void> {
    try {
      const generatedVideos = [];
      const resolution = await this.getVideoResolution(resolve(videoPath));
      const qualities = this.determineQualities(resolution);

      for (const quality of qualities) {
        const generatedVideo = await this.generateLowerQualityVideo(userId, videoPath, quality);
        generatedVideos.push(generatedVideo);
      }
      return generatedVideos;
    } catch (error) {
      console.error('Error in compress:', error);
    }
  }

  private getVideoResolution(videoPath: string): Promise<Resolution> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(videoPath, (err, metadata) => {
        if (err) {
          reject(err);
        }
        const { width, height } = metadata.streams[0];
        resolve({ width, height });
      });
    });
  }

  private determineQualities(resolution: Resolution): number[] {
    const { height } = resolution;
    const resolutionMap: Record<number, number[]> = {
      1080: [720, 480, 360],
      720: [480, 360],
      480: [360]
    };

    return resolutionMap[height!] || [];
  }

  private async generateLowerQualityVideo(userId: string, videoPath: string, quality: number): Promise<GeneratedVideo> {
    const link = `user_${userId}_output_${uuidv4().slice(4)}_${quality}.mp4`;

    return new Promise<GeneratedVideo>((resolve, reject) => {
      ffmpeg(videoPath)
        .size(`?x${quality}`)
        .save(link)
        .on('end', async () => {
          console.log(`Generated: ${link}`);

          const generatedVideo: GeneratedVideo = {
            link,
            quality,
            userId
          };

          try {
            await this.saveToDb(generatedVideo);
            resolve(generatedVideo);
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (err) => {
          console.error('Error:', err);
          reject(err);
        });
    });
  }

  private async saveToDb(videoData: GeneratedVideo) {
    await compressVideoRepository.create(videoData);
  }
}

export default new VideoCompressor();

const videoCompressor = new VideoCompressor();

videoCompressor
  .compress('../video/video.mp4', '1')
  .then(() => {
    console.log('Compression completed');
  })
  .catch((err) => {
    console.error('Compression failed:', err);
  });
