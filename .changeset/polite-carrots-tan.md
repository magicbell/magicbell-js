---
'magicbell': minor
---

Release the [imports resource](https://www.magicbell.com/docs/rest-api/reference#imports-create) as stable. This includes the following apis:

**Create a import**

Enqueues an import - currently only supported for users.

```js
await magicbell.imports.create({
  users: [
    {
      external_id: 'ugiabqertz',
      email: 'johndoe@example.com',
      first_name: 'John',
      last_name: 'Doe',
      custom_attributes: {
        age: 32,
        country: 'Spain',
      },
    },
  ],
});
```

**Get the status of an import**

Query the status of the import for a summary of imported records and failures for each record that could not be imported successfully.

```js
await magicbell.imports.get('{import_id}');
```
