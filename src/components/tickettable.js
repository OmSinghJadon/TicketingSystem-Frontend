import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";


const TicketTable = ({data , currentPage}) => {
    const navigate = useNavigate()
    const handleTicketClick =(item) =>{
      navigate("/ticket/detail" , {state:{item}})
    }
    return (
      <table class="table table-hover ">
                <thead>
                  <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">Ticket Id</th>
                    <th scope="col">User</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Category</th>
                    <th scope="col">Status</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    return (
                      <tr onClick={()=>handleTicketClick(item)}>
                        <th>{((currentPage-1)*10) + (index + 1)}</th>
                        <td>{item.uuid}</td>
                        <td className=" text-capitalize ">
                          {item.user.name.toLowerCase()}
                        </td>
                        <td className=" text-capitalize ">{item.title}</td>
                        <td className=" text-capitalize ">
                          {item.type.toLowerCase()}
                        </td>
                        <td className="text-capitalize text-success ">
                          {item.status.toLowerCase()}
                        </td>
                        {item.priority == "HIGH" ? (
                          <td className="text-capitalize text-danger ">
                            {item.priority.toLowerCase()}
                          </td>
                        ) : item.priority == "LOW" ? (
                          <td className="text-capitalize text-success ">
                            {item.priority.toLowerCase()}
                          </td>
                        ) : (
                          <td className="text-capitalize text-warning ">
                            {item.priority.toLowerCase()}
                          </td>
                        )}
                        <td>
                          {moment(item.createdAt).format("DD MMM YYYY h:mm a")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
    )
  }

  export default TicketTable;