import { CompressVideoModel } from '../models/compressVideo';

class CompressVideoRepository {
  async create(videoData: any) {
    try {
      const video = await CompressVideoModel.create(videoData);
      return video;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const video = await CompressVideoModel.findById(id);
      return video;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const videos = await CompressVideoModel.find();
      return videos;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, videoData: any) {
    try {
      const updatedVideo = await CompressVideoModel.findByIdAndUpdate(id, videoData, { new: true });
      return updatedVideo;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await CompressVideoModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default new CompressVideoRepository();
