// import Link from 'next/link';

// export default function UploadMediaPage() {
//   return (
//     <div className="pt-32 px-10 min-h-screen">
//       <div className="bg-dark-card p-12 shadow-2xl min-h-[600px] flex flex-col justify-between">
//         <div className="flex justify-between items-start">
//           <div className="max-w-xl">
//             <p className="text-oasysBlue font-bold mb-1">Upload Media Here</p>
//             <h1 className="text-7xl font-black text-white leading-tight">Upload Road Media</h1>
//           </div>
          
//           <div className="text-right">
//             <p className="text-oasysBlue font-bold text-sm mb-4">Supported formats: JPG, PNG, MP4.</p>
//             <p className="text-gray-400 text-sm max-w-xs mb-6">
//               Our AI will detect crack type and severity level automatically.
//             </p>
//             <div className="flex items-center justify-end gap-4">
//               <span className="text-gray-400 italic">Together we can build a better future</span>
//               <Link href="/report-damage/result" className="btn-blue px-10">
//                 Upload 
//                 <span className="w-4 h-4 bg-white rounded-full ml-2" /> {/* Toggle style */}
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Upload Zones */}
//         <div className="grid grid-cols-2 gap-8 mt-12">
//           <div className="bg-[#D9D9D9] border-4 border-oasysBlue rounded-xl h-[350px] flex items-center justify-center text-black font-bold text-xl cursor-pointer hover:bg-gray-200 transition-colors">
//             Drag or Upload Image Here
//           </div>
//           <div className="bg-[#D9D9D9] rounded-xl h-[350px] flex items-center justify-center text-black font-bold text-xl cursor-pointer hover:bg-gray-200 transition-colors">
//             Drag or Upload Video Here
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }