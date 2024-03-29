import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImageUseCase } from "./uploadCarImageUseCase";

interface IFiles {
  filename: string;
}

export class UploadCarImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const images = req.files as IFiles[];

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    const fileNames = images.map((file) => file.filename);

    await uploadCarImageUseCase.execute({ car_id: id, images_name: fileNames });

    return res.status(201).send();
  }
}
