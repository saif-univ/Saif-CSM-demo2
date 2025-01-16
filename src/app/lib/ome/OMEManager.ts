import axios from "axios";

export default class OMEManager {
  private baseUrl: string;
  private apiSecret: string;

  constructor(baseUrl: string, apiSecret: string) {
    this.baseUrl = baseUrl;
    this.apiSecret = apiSecret;
  }

  private getAuthHeader() {
    return { Authorization: `Basic ${this.apiSecret}` };
  }

  async startRecording(id: string, streamName: string) {
    const endpoint = `${this.baseUrl}:startRecord`;
    const data = {
      id,
      stream: { name: streamName },
    };

    try {
      const response = await axios.post(endpoint, data, {
        headers: this.getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to start recording: ${error.message}`);
    }
  }

  async stopRecording(id: string, streamName: string) {
    const endpoint = `${this.baseUrl}:stopRecord`;
    const data = {
      id,
      stream: { name: streamName },
    };

    try {
      const response = await axios.post(endpoint, data, {
        headers: this.getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to stop recording: ${error.message}`);
    }
  }

  async getRecordingStatus(id: string) {
    const endpoint = `${this.baseUrl}:records`;
    try {
      const response = await axios.get(endpoint, {
        headers: this.getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch recording status: ${error.message}`);
    }
  }
}
