import { Request, Response } from "express";
import connection from "../conn";
import { Message } from "../entity/Message";

export class MainController {
  private emailRegexp = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  private categories: { value: string; label: string }[] = [
    { value: "billing", label: "Facturación" },
    { value: "support", label: "Soporte técnico" },
    { value: "sales", label: "Ventas" },
    { value: "general", label: "Información general" },
  ];

  public getAllCategories(req: Request, res: Response) {
    res.status(200).json(this.categories);
  }

  private validateMessage(data: Record<string, string>) {
    const errors: Record<string, string> = {};
    const values: Record<string, string> = {};

    for (const key of [
      "name",
      "company",
      "email",
      "category",
      "phone",
      "value",
    ]) {
      values[key] = typeof data[key] !== "string" ? "" : data[key].trim();

      if (values[key] === "") {
        errors[key] = "Campo obligatorio.";
      } else if (key === "email" && !this.emailRegexp.test(values[key])) {
        errors[key] = "Debe ser una dirección de correo válida.";
      } else if (key === "category") {
        let valid = false;
        for (const current of this.categories) {
          if (current.value === values[key]) {
            valid = true;
            break;
          }
        }
        if (!valid) {
          errors[key] = "Categoría inválida.";
        }
      }
      const maxLength = key === "value" ? 1000 : 255;
      if (!errors[key] && values[key].length > maxLength) {
        errors[key] = `Debe contener cómo máximo ${maxLength} caracteres.`;
      }
    }
    return { errors, values, status: Object.keys(errors).length === 0 };
  }

  public storeMessage(req: Request, res: Response) {
    connection
      .then(async (connection) => {
        let { values, errors, status } = this.validateMessage(req.body);
        if (!status) {
          res.status(422).json(errors);
        } else {
          let message = new Message();
          for (const key of Object.keys(values)) {
            message[key] = values[key];
          }
          await connection.manager.save(message);
          res.status(201).json({ message: "Message saved" });
        }
      })
      .catch((error) => {
        console.error("Error ", error);
        res.json(error);
      });
  }
}
