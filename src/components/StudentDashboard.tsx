import React, { useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

  import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
  
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '../features/students/studentsSlice';
import { RootState, AppDispatch } from '../app/store';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Input } from './ui/input';

const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })

const StudentsDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { students, status, error } = useSelector((state: RootState) => state.students);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

  }
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div className="p-6 bg-white rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      <div className='flex justify-between items-center'>
        <div className='flex gap-4'>
            <Select>
    <SelectTrigger className="w-[150px] bg-[#E9EDF1] border-none">
        <SelectValue placeholder="Cohort" />
    </SelectTrigger>
    <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
    </SelectContent>
    </Select>

    <Select>
    <SelectTrigger className="w-[150px] bg-[#E9EDF1] border-none">
        <SelectValue  placeholder="Course" />
    </SelectTrigger>
    <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
    </SelectContent>
    </Select>
        </div>

        <Dialog>
  <DialogTrigger><Button variant="secondary" className='bg-[#E9EDF1] border-none text-[#3F526E] font-bold text-base'><Plus size={20} /> Add new Student</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

        
        
      </div>
      
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <Table className="w-full">
          <TableHeader>
            <TableRow className="">
              <TableHead className="p-2  text-black text-xs font-bold ">Student Name</TableHead>
              <TableHead className="p-2  text-black text-xs font-bold ">Cohort</TableHead>
              <TableHead className="p-2  text-black text-xs font-bold ">Courses</TableHead>
              <TableHead className="p-2  text-black text-xs font-bold ">Date Joined</TableHead>
              <TableHead className="p-2  text-black text-xs font-bold ">Last Login</TableHead>
              <TableHead className="p-2  text-black text-xs font-bold text-right ">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id} className="">
                <TableCell className="p-2 text-xs font-normal">{student.name}</TableCell>
                <TableCell className="p-2 text-xs font-normal">{student.cohort}</TableCell>
                <TableCell className="p-2 text-xs font-medium flex flex-wrap gap-3">
                    {student.courses && student.courses.map((course, index) => (
                        <div key={index} className='bg-slate-100 py-1 pl-1 pr-4 rounded-lg'>
                            {course}
                        </div>
                    ))}
                </TableCell>
                <TableCell className="p-2 text-xs font-normal">
                  {new Date(student.dateJoined).toLocaleDateString()}
                </TableCell>
                <TableCell className="p-2 text-xs font-normal">
                  {new Date(student.lastLogin).toLocaleDateString()}
                </TableCell>
                <TableCell className="p-2 flex justify-end mr-3 text-xs font-normal">
                  <div className={`${student.status ? 'bg-[#4AEA40]' : 'bg-[#EA4E40]'} h-[14px] w-[14px] rounded-full`} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default StudentsDashboard;