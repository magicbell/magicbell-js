export type User =
  | {
      email: Email;
      external_id?: ExternalId;
      custom_attributes?: CustomAttributes;
      first_name?: FirstName;
      last_name?: LastName;
      phone_numbers?: PhoneNumbers;
    }
  | {
      email: Email1;
      external_id?: ExternalId1;
      custom_attributes?: CustomAttributes1;
      first_name?: FirstName1;
      last_name?: LastName1;
      phone_numbers?: PhoneNumbers1;
    }
  | {
      email?: Email2;
      external_id: ExternalId2;
      custom_attributes?: CustomAttributes2;
      first_name?: FirstName2;
      last_name?: LastName2;
      phone_numbers?: PhoneNumbers2;
    }
  | {
      email?: Email3;
      external_id: ExternalId3;
      custom_attributes?: CustomAttributes3;
      first_name?: FirstName3;
      last_name?: LastName3;
      phone_numbers?: PhoneNumbers3;
    };
type Email = string;
type ExternalId = string;
type FirstName = string;
type LastName = string;
type PhoneNumbers = string[];
type Email1 = string;
type ExternalId1 = string;
type FirstName1 = string;
type LastName1 = string;
type PhoneNumbers1 = string[];
type Email2 = string;
type ExternalId2 = string;
type FirstName2 = string;
type LastName2 = string;
type PhoneNumbers2 = string[];
type Email3 = string;
type ExternalId3 = string;
type FirstName3 = string;
type LastName3 = string;
type PhoneNumbers3 = string[];

interface CustomAttributes {
  [k: string]: unknown;
}
interface CustomAttributes1 {
  [k: string]: unknown;
}
interface CustomAttributes2 {
  [k: string]: unknown;
}
interface CustomAttributes3 {
  [k: string]: unknown;
}
