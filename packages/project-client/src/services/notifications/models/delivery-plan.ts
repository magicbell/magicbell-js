import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const deliveryPlan = z.lazy(() => {
  return z.object({
    category: z.string().optional().nullable(),
    completedAt: z.string().optional().nullable(),
    id: z.string().optional(),
    nextStep: z.number().optional(),
    notificationId: z.string().optional(),
    scheduledAt: z.string().optional(),
    startedAt: z.string().optional().nullable(),
    status: z.string().optional(),
    topic: z.string().optional().nullable(),
    userId: z.string().optional(),
  });
});

/**
 *
 * @typedef  {DeliveryPlan} deliveryPlan
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {number}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type DeliveryPlan = z.infer<typeof deliveryPlan>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const deliveryPlanResponse = z.lazy(() => {
  return z
    .object({
      category: z.string().optional().nullable(),
      completed_at: z.string().optional().nullable(),
      id: z.string().optional(),
      next_step: z.number().optional(),
      notification_id: z.string().optional(),
      scheduled_at: z.string().optional(),
      started_at: z.string().optional().nullable(),
      status: z.string().optional(),
      topic: z.string().optional().nullable(),
      user_id: z.string().optional(),
    })
    .transform((data) => ({
      category: data['category'],
      completedAt: data['completed_at'],
      id: data['id'],
      nextStep: data['next_step'],
      notificationId: data['notification_id'],
      scheduledAt: data['scheduled_at'],
      startedAt: data['started_at'],
      status: data['status'],
      topic: data['topic'],
      userId: data['user_id'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const deliveryPlanRequest = z.lazy(() => {
  return z
    .object({
      category: z.string().optional().nullable(),
      completedAt: z.string().optional().nullable(),
      id: z.string().optional(),
      nextStep: z.number().optional(),
      notificationId: z.string().optional(),
      scheduledAt: z.string().optional(),
      startedAt: z.string().optional().nullable(),
      status: z.string().optional(),
      topic: z.string().optional().nullable(),
      userId: z.string().optional(),
    })
    .transform((data) => ({
      category: data['category'],
      completed_at: data['completedAt'],
      id: data['id'],
      next_step: data['nextStep'],
      notification_id: data['notificationId'],
      scheduled_at: data['scheduledAt'],
      started_at: data['startedAt'],
      status: data['status'],
      topic: data['topic'],
      user_id: data['userId'],
    }));
});
