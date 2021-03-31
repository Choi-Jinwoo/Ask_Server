import { Body, Controller, Post, Request } from '@nestjs/common';
import { ReqUser } from 'decorators/req-user.decorator';
import { User } from 'entities/user.entity';
import { BaseResponse } from 'models/http/base.response';
import { CloseLectureDto } from './dto/close-lecture.dto';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { JoinLectureDto } from './dto/join-lecture.dto';
import { LectureService } from './lecture.service';

@Controller('lecture')
export class LectureController {
  constructor(
    private readonly lectureService: LectureService,
  ) { }

  @Post()
  async create(@Body() createLectureDto: CreateLectureDto): Promise<BaseResponse> {
    const lecture = await this.lectureService.create(createLectureDto);

    return BaseResponse.object('강의 생성 성공', {
      lecture,
    });
  }

  @Post('join')
  async join(
    @ReqUser() user: User,
    @Body() joinLectureDto: JoinLectureDto): Promise<BaseResponse> {
    await this.lectureService.join(user, joinLectureDto);

    return BaseResponse.object('강의 참여 성공');
  }

  @Post('close')
  async close(
    @Body() closeLectureDto: CloseLectureDto): Promise<BaseResponse> {
    await this.lectureService.close(closeLectureDto);

    return BaseResponse.object('강의 종료 성공');
  }
}
