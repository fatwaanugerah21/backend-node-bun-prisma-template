import { Prisma } from "@prisma/client";
import DatabaseLib from "../libs/database.lib";
import { TFetchAllParams } from "../types/indexType";
import { getFileUrl } from "../utils/functions.util";
import CurriculumRepository from "./curriculum.repository";

export type TCreateCourseBody = {
  coverImg: string;
  title: string;
  description: string;
};
export type TUpdateCourseBody = {
  coverImg?: string;
  title?: string;
  description?: string;
};

export type TGetCoursesParams = {
  term?: string;
};

class CourseRepository {
  static courseSelect: Prisma.CourseSelect = {
    id: true,
    title: true,
    description: true,
    coverImg: true,
  };

  static async createCourse(data: TCreateCourseBody) {
    try {
      const resp = await DatabaseLib.models.course.create({
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async updateCourse(id: number, data: TUpdateCourseBody) {
    try {
      const resp = await DatabaseLib.models.course.update({
        where: { id },
        data,
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async deleteCourseById(id: number) {
    try {
      const resp = await DatabaseLib.models.course.delete({
        where: { id },
      });

      return resp;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getCourses({
    limit,
    offset,
    term,
  }: TGetCoursesParams & TFetchAllParams) {
    try {
      const resp = await DatabaseLib.models.course.findMany({
        skip: offset,
        take: limit,
        select: this.courseSelect,
        where: {
          title: { contains: term?.toLowerCase() },
          description: { contains: term?.toLowerCase() },
        },
      });

      const courses = resp.map((course) => ({
        ...course,
        coverImg: `${getFileUrl(course.coverImg)}`,
      }));

      return courses;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }

  static async getCourseById(id: number) {
    try {
      const resp = await DatabaseLib.models.course.findFirst({
        where: {
          id,
        },
        select: {
          ...this.courseSelect,
          curriculums: { select: CurriculumRepository.curriculumSelect },
        },
      });

      if (!resp) throw `404|COURSE_NOT_FOUND`;

      const course = {
        ...resp,
        coverImg: getFileUrl(resp.coverImg),
      };
      return course;
    } catch (error) {
      console.log("Error on service: ", error);
      throw error;
    }
  }
}

export default CourseRepository;
