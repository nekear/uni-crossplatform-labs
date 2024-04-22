import {z} from "zod";
import {RefinementService} from "@/views/lab8/refinements";

const refinementService = new RefinementService();
const personNameRefinement = refinementService.refinePersonName();
const phoneRefinement = refinementService.refinePhoneNumber();

export const facultyFormSchema = z.object({
    faculty_name: z.string(),
    dean_name: z.string().refine(personNameRefinement.refine, personNameRefinement.message),
    phone: z.string().refine(phoneRefinement.refine, phoneRefinement.message),
    address: z.string(),
    departments: z.array(
        z.object({
            name: z.string().trim(),
        })
    )
})

export type FacultyFormTyping = z.infer<typeof facultyFormSchema>
