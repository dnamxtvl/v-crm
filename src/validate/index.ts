import { RULES_VALIDATION } from "./rules";
import { Rule } from "antd/es/form";
import { useValidator } from "@/utils/validator";
import { useTranslations } from "next-intl";

export default class Validate {
  t: any;

  constructor() {
    this.t = useTranslations();
  }

  authValidate = (): { email: Rule[]; password: Rule[] }  => {
    return {
      email: [
        { required: true, message: this.t("auth.validate.email_required") },
        {
          validator: async (_, value) => {
            if (!useValidator().isInvalidEmail(value ?? "")) {
              return Promise.reject(
                new Error(this.t("auth.validate.email_invalid"))
              );
            }

            return Promise.resolve();
          },
        },
      ],
      password: [
        { required: true, message: this.t("auth.validate.password_required") },
        {
          min: RULES_VALIDATION.PASSWORD_LENGTH.MIN,
          message:
            this.t("auth.validate.password_min_length") +
            RULES_VALIDATION.PASSWORD_LENGTH.MIN +
            this.t("auth.validate.charater"),
        },
        {
          max: RULES_VALIDATION.PASSWORD_LENGTH.MAX,
          message:
            this.t("auth.validate.password_max_length") +
            RULES_VALIDATION.PASSWORD_LENGTH.MAX +
            this.t("auth.validate.charater"),
        },
      ],
    };
  }
}
