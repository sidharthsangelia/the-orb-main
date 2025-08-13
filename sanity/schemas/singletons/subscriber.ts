// sanity/schemas/subscriber.ts
export default {
  name: 'subscriber',
  title: 'Subscriber',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
  ],
};
