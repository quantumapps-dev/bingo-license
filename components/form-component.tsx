// @ts-nocheck 
 "use client";

import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, FormSchema } from "@/schemas/formSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export function FormComponent() {
  const [step, setStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: "onTouched",
  });

  const applicantFields: (keyof FormData)[] = [
    "applicantName",
    "entityType",
    "organizationName",
    "email",
    "phone",
    "addressStreet",
    "city",
    "state",
    "zip",
    "municipality",
    "otherMunicipality",
  ];

  const licenseFields: (keyof FormData)[] = [
    "licenseType",
    "sessionsPerYear",
    "startDate",
    "expirationDate",
    "isNonProfit",
    "ein",
    "agreeToRules",
  ];

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      console.log("Franklin County Bingo License Submission:", values);
      // placeholder: replace with server action when available
    } catch (err) {
      console.error("Submission error", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const next = async () => {
    const fieldsToValidate = step === 0 ? applicantFields : licenseFields;
    const ok = await form.trigger(fieldsToValidate as any);
    if (ok) setStep((s) => Math.min(2, s + 1));
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 max-w-3xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Franklin County Bingo License Application</h2>
          <div className="text-sm text-muted-foreground">Step {step + 1} of 3</div>
        </div>

        {step === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="applicantName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Applicant name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" {...field} aria-invalid={Boolean(form.formState.errors[field.name as keyof FormData])} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="entityType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entity type</FormLabel>
                  <FormControl>
                    <Select onValueChange={(val) => field.onChange(val)} value={field.value as string | undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select entity type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Individual">Individual</SelectItem>
                        <SelectItem value="Organization">Organization</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organizationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization name (if applicable)</FormLabel>
                  <FormControl>
                    <Input placeholder="Organization name" {...field} aria-invalid={Boolean(form.formState.errors[field.name as keyof FormData])} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" type="email" {...field} aria-invalid={Boolean(form.formState.errors[field.name as keyof FormData])} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="555-555-5555" {...field} aria-invalid={Boolean(form.formState.errors[field.name as keyof FormData])} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressStreet"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Street address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} aria-invalid={Boolean(form.formState.errors[field.name as keyof FormData])} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Chambersburg" {...field} aria-invalid={Boolean(form.formState.errors[field.name as keyof FormData])} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Select onValueChange={(v) => field.onChange(v)} value={field.value as string | undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PA">PA</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP</FormLabel>
                  <FormControl>
                    <Input placeholder="17201" {...field} aria-invalid={Boolean(form.formState.errors[field.name as keyof FormData])} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="municipality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Municipality</FormLabel>
                  <FormControl>
                    <Select onValueChange={(v) => field.onChange(v)} value={field.value as string | undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select municipality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Chambersburg">Chambersburg</SelectItem>
                        <SelectItem value="Waynesboro">Waynesboro</SelectItem>
                        <SelectItem value="Shippensburg">Shippensburg</SelectItem>
                        <SelectItem value="Greencastle">Greencastle</SelectItem>
                        <SelectItem value="Mercersburg">Mercersburg</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="otherMunicipality"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Other municipality (if selected)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter municipality" {...field} aria-invalid={Boolean(form.formState.errors[field.name as keyof FormData])} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="licenseType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License type</FormLabel>
                  <FormControl>
                    <Select onValueChange={(v) => field.onChange(v)} value={field.value as string | undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select license type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Charitable Bingo">Charitable Bingo</SelectItem>
                        <SelectItem value="Commercial Bingo">Commercial Bingo</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sessionsPerYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sessions per year</FormLabel>
                  <FormControl>
                    <Input type="number" inputMode="numeric" placeholder="12" {...field} aria-invalid={Boolean(form.formState.errors[field.name as keyof FormData])} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel>Start date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button type="button" variant="outline" className="justify-start font-normal">
                          {field.value ? field.value.toISOString().slice(0, 10) : "Select start date"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-0">
                      <Calendar
                        mode="single"
                        selected={field.value as Date | undefined}
                        disabled={{ before: new Date() }}
                        onSelect={(d) => {
                          if (d) field.onChange(d);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expirationDate"
              render={({ field }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel>Expiration date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button type="button" variant="outline" className="justify-start font-normal">
                          {field.value ? field.value.toISOString().slice(0, 10) : "Select expiration date"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-0">
                      <Calendar
                        mode="single"
                        selected={field.value as Date | undefined}
                        onSelect={(d) => {
                          if (d) field.onChange(d);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isNonProfit"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3 md:col-span-2">
                  <FormControl>
                    <Switch checked={Boolean(field.value)} onCheckedChange={(v) => field.onChange(Boolean(v))} aria-invalid={Boolean(form.formState.errors[field.name as keyof FormData])} />
                  </FormControl>
                  <div>
                    <FormLabel className="mb-0">Operating as non-profit</FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ein"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>EIN (if applicable)</FormLabel>
                  <FormControl>
                    <Input placeholder="12-3456789" {...field} aria-invalid={Boolean(form.formState.errors[field.name as keyof FormData])} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreeToRules"
              render={({ field }) => (
                <FormItem className="md:col-span-2 flex items-start gap-3">
                  <FormControl>
                    <Switch checked={Boolean(field.value)} onCheckedChange={(v) => field.onChange(Boolean(v))} aria-invalid={Boolean(form.formState.errors[field.name as keyof FormData])} />
                  </FormControl>
                  <div>
                    <FormLabel className="mb-0">I agree to Franklin County bingo regulations</FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4">
            <div className="bg-muted p-4 rounded-md">Review your application below. If everything looks correct, submit.</div>

            <div className="grid grid-cols-1 gap-2">
              <pre className="whitespace-pre-wrap bg-white border p-4 rounded text-sm">{JSON.stringify(form.getValues(), null, 2)}</pre>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 pt-4">
          {step > 0 ? (
            <Button type="button" variant="outline" onClick={back} disabled={isSubmitting}>
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 2 ? (
            <Button type="button" onClick={next}>
              Continue
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit application"}
            </Button>
          )}

          <Button type="button" variant="outline" onClick={() => form.reset()} disabled={isSubmitting}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}
