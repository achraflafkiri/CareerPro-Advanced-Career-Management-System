// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { createNewClient } from "../../api/functions/clients";
// import { useStateContext } from "../../context/ContextProvider";
// import { toast } from "react-toastify";

// const ClientCreate = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     client_name: "",
//     matricule: "",
//     volume: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const { token } = useStateContext();
//   //  get the id of societe
//   const { societeId } = useParams();
//   const handleSubmit = async (event) => {
//     console.log("cliked");
//     event.preventDefault();
//     try {
//       if (!token) {
//         throw new Error("Token not found");
//       }
//       const response = await createNewClient(token, formData, societeId);
//       if (response.status === 201) {
//         navigate(`/societe/${societeId}/clients/`);
//         console.log(response.data);
//         toast.success(`Added client successfully`, {
//           position: "bottom-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: false,
//           progress: undefined,
//           theme: "colored",
//         });
//       } else {
//         throw new Error("failed");
//       }
//     } catch (err) {
//       toast.warn(`${err.response.data.message}`, {
//         position: "bottom-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: false,
//         progress: undefined,
//         theme: "colored",
//       });
//     }
//   };

//   return (
//     <div className="row">
//       <div className="col-md-12 grid-margin stretch-card">
//         <div className="card">
//           <div className="card-body">
//             <h4 className="card-title">Enter information about client</h4>
//             <p className="card-description"></p>
//             <form className="forms-sample" onSubmit={handleSubmit}>
//               <div className="form-group row">
//                 <label htmlFor="name" className="col-sm-3 col-form-label">
//                   Name
//                 </label>
//                 <div className="col-sm-9">
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="client_name"
//                     name="client_name"
//                     placeholder="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//               <div className="form-group row">
//                 <label htmlFor="matricule" className="col-sm-3 col-form-label">
//                   Matricule
//                 </label>
//                 <div className="col-sm-9">
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="matricule"
//                     name="matricule"
//                     placeholder="matricule"
//                     value={formData.matricule}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//               <div className="form-group row">
//                 <label htmlFor="volume" className="col-sm-3 col-form-label">
//                   Volume
//                 </label>
//                 <div className="col-sm-9">
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="volume"
//                     name="volume"
//                     placeholder="volume"
//                     value={formData.volume}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//               <button type="submit" className="btn btn-primary me-2">
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientCreate;
