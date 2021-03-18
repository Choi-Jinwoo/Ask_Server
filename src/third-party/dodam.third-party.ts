import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { DODAM_URL } from 'config/endpoint';
import { ErrorCode } from 'errors/error-code.enum';
import { ExpiredError } from 'errors/expired.error';

@Injectable()
export class DodamThirdParty {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: DODAM_URL,
    });

    this.applyInterceptors();
  }

  private applyInterceptors() {
    this.axiosInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const { status } = err;
        if (status === 410) {
          throw new ExpiredError(ErrorCode.DODAM_TOKEN_EXPIRED);
        }

        throw err;
      });
  }

  async login(id: string, pw: string): Promise<string> {
    try {
      const res = await this.axiosInstance.post(`${DODAM_URL}/auth/login`, {
        id,
        pw,
      });

      const { data: { data } } = res;
      const token = data['token'];

      return token;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}