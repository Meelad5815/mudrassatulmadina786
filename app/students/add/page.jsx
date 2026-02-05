"use client";

import { useEffect, useState } from "react";
import { addStudent, getStudentById, updateStudent } from "@/lib/mock-service";
import { useRouter, useSearchParams } from "next/navigation";
import StudentForm from "@/components/student-form";
import { useToast } from "@/lib/toast-context";
import { Suspense } from "react";

function AddStudentInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const editId = searchParams.get("edit");
  const [initial, setInitial] = useState(null);

  useEffect(() => {
    if (editId) {
      getStudentById(editId).then((s) => setInitial(s)).catch(console.error);
    }
  }, [editId]);

  const handleCreate = async (data) => {
    await addStudent(data);
    toast.add("\u0637\u0627\u0644\u0628\u0639\u0644\u0645 \u06A9\u0627\u0645\u06CC\u0627\u0628\u06CC \u0633\u06D2 \u0634\u0627\u0645\u0644 \u06C1\u0648\u0627", "success");
    router.push("/students");
  };

  const handleUpdate = async (data) => {
    await updateStudent(editId, data);
    toast.add("\u0637\u0627\u0644\u0628\u0639\u0644\u0645 \u06A9\u06CC \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u067E\u0688\u06CC\u0679 \u06C1\u0648 \u06AF\u0626\u06CC", "success");
    router.push("/students");
  };

  if (editId && initial === null) return <div>Loading...</div>;

  return (
    <div>
      <h2>{editId ? "\u0637\u0627\u0644\u0628\u0639\u0644\u0645 \u062A\u0631\u0645\u06CC\u0645 \u06A9\u0631\u06CC\u06BA" : "\u0637\u0627\u0644\u0628\u0639\u0644\u0645 \u0634\u0627\u0645\u0644 \u06A9\u0631\u06CC\u06BA"}</h2>
      <div className="card">
        <StudentForm
          initial={initial || {}}
          onSubmit={editId ? handleUpdate : handleCreate}
          submitLabel={editId ? "\u0627\u067E\u0688\u06CC\u0679 \u06A9\u0631\u06CC\u06BA" : "\u0645\u062D\u0641\u0648\u0638 \u06A9\u0631\u06CC\u06BA"}
        />
      </div>
    </div>
  );
}

export default function AddStudentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddStudentInner />
    </Suspense>
  );
}
