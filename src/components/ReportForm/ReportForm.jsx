import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const ReportForm = ({ productId }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/reports", {
        ...data,
        productId,
      });
      toast.success("Report submitted!");
      reset();
    } catch (error) {
      console.error("Report Error:", error);
      toast.error("Failed to submit report.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-200 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Report This Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("reporterName", { required: true })}
          type="text"
          placeholder="Your Name"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          {...register("reason", { required: true })}
          placeholder="Reason for reporting this product"
          rows="4"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
