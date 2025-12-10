# FcmConfigPayload

**Properties**

| Name                    | Type   | Required | Description                                                                                      |
| :---------------------- | :----- | :------- | :----------------------------------------------------------------------------------------------- |
| authProviderX509CertUrl | string | ✅       | URL for Google's OAuth provider x509 certificates used to validate tokens.                       |
| authUri                 | string | ✅       | OAuth authorization endpoint used when exchanging Firebase credentials.                          |
| clientEmail             | string | ✅       | The client email address from the Firebase service account.                                      |
| clientId                | string | ✅       | The numeric client identifier for the Firebase service account.                                  |
| clientX509CertUrl       | string | ✅       | URL to the public x509 certificate for this service account.                                     |
| privateKey              | string | ✅       | The PEM encoded service account private key used to sign Firebase credentials.                   |
| privateKeyId            | string | ✅       | Identifier of the private key inside the downloaded service account JSON.                        |
| projectId               | string | ✅       | The Firebase project ID associated with this service account.                                    |
| tokenUri                | string | ✅       | OAuth token endpoint used to mint access tokens for FCM.                                         |
| type                    | Type\_ | ✅       | Indicates the kind of Google credential. Service accounts always use the `service_account` type. |
| universeDomain          | string | ✅       | The Google Cloud universe domain hosting the Firebase APIs.                                      |

# Type\_

Indicates the kind of Google credential. Service accounts always use the `service_account` type.

**Properties**

| Name            | Type   | Required | Description       |
| :-------------- | :----- | :------- | :---------------- |
| SERVICE_ACCOUNT | string | ✅       | "service_account" |
