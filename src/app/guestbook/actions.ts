
"use server";

import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const entriesFilePath = path.join(process.cwd(), "src", "lib", "guestbook-entries.json");

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(50, "Name cannot exceed 50 characters."),
  message: z.string().min(5, "Message must be at least 5 characters.").max(500, "Message cannot exceed 500 characters."),
});

export type GuestbookFormInput = z.infer<typeof formSchema>;

async function readEntries(): Promise<GuestbookEntry[]> {
  try {
    const data = await fs.readFile(entriesFilePath, "utf-8");
    return JSON.parse(data) as GuestbookEntry[];
  } catch (error) {
    // If file doesn't exist or is invalid, return empty array
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    console.error("Failed to read guestbook entries:", error);
    return [];
  }
}

async function writeEntries(entries: GuestbookEntry[]): Promise<void> {
  try {
    await fs.writeFile(entriesFilePath, JSON.stringify(entries, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write guestbook entries:", error);
    throw new Error("Could not save guestbook entry.");
  }
}

export async function addGuestbookEntry(formData: GuestbookFormInput): Promise<{ success: boolean; message: string; error?: string }> {
  const validationResult = formSchema.safeParse(formData);

  if (!validationResult.success) {
    console.error("Server-side validation failed:", validationResult.error.flatten());
    return { success: false, message: "Invalid form data.", error: validationResult.error.flatten().fieldErrors.message?.[0] || validationResult.error.flatten().fieldErrors.name?.[0] || "Validation error" };
  }

  const { name, message } = validationResult.data;
  const newEntry: GuestbookEntry = {
    id: Date.now().toString(), // Simple ID generation
    name,
    message,
    timestamp: new Date().toISOString(),
  };

  try {
    const entries = await readEntries();
    entries.unshift(newEntry); // Add new entry to the beginning
    await writeEntries(entries);
    revalidatePath("/guestbook"); // Revalidate the guestbook page to show new entry
    return { success: true, message: "Entry added successfully!" };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred while saving the entry.";
    return { success: false, message: "Failed to add entry.", error: errorMessage };
  }
}

export async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
  return await readEntries();
}
