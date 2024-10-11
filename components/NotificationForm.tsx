"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
  message: z.string().min(1, 'Message is required').max(500, 'Message must be 500 characters or less'),
  platform: z.enum(['ios', 'android', 'both'], {
    required_error: "You need to select a platform",
  }),
  subtitle: z.string().max(100, 'Subtitle must be 100 characters or less').optional(),
  badgeCount: z.string().regex(/^\d*$/, 'Badge count must be a number').optional(),
  playSound: z.boolean().optional(),
  channelId: z.string().max(100, 'Channel ID must be 100 characters or less').optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function NotificationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      message: "",
      platform: "both",
      subtitle: "",
      badgeCount: "",
      playSound: false,
      channelId: "",
    },
  });

  const watchPlatform = form.watch("platform");

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    console.log(values);
    toast({
      title: "Notification sent",
      description: `Title: ${values.title}\nPlatform: ${values.platform}`,
    })
    form.reset();

    // In a real application, you would save this notification to your backend
    // For now, we'll just log it to the console
    console.log('Notification sent:', {
      ...values,
      sentAt: new Date().toISOString(),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notification Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter notification title" {...field} />
              </FormControl>
              <FormDescription>
                This will be the title of your notification.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notification Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter notification message"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This will be the body of your notification.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="platform"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Target Platform</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="ios" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      iOS
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="android" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Android
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="both" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Both
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {(watchPlatform === 'ios' || watchPlatform === 'both') && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">iOS Specific Options</h3>
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle (iOS only)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter subtitle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="badgeCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Badge Count (iOS only)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter badge count" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="playSound"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Play Sound (iOS only)
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        )}
        {(watchPlatform === 'android' || watchPlatform === 'both') && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Android Specific Options</h3>
            <FormField
              control={form.control}
              name="channelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel ID (Android only)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter channel ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Notification'}
        </Button>
      </form>
    </Form>
  );
}