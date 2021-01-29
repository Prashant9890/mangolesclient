import React from "react";
import AuthHandler from "../utils/AuthHandler";
import APIHandler from "../utils/APIHandler";
import { Link } from "react-router-dom";
import AutoCompleteMedicine from "../components/AutoCompleteMedicine";
import GoogleFontLoader from 'react-google-font-loader';

class BillGenerateComponent extends React.Component {

  render(){
    return(
      <GoogleFontLoader
    fonts={[
        {
            font: 'Bungee Inline',
            weights: [400],
        },
    ]}
    />
    );
  }
  
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }


  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    total_bill_id: 0,
    medicineDetails: [
      {
        sr_no: 1,
        id: 0,
        medicine_name: "",
        qty: "",
        qty_type: "",
        unit_price: "",
        c_gst: "",
        s_gst: "",
        discount_percentage:"",
        discount_amount:"",
        before_disc_amount:"",
        amount: "",

      },
    ],
    currentSrno: 1,
  };

  async formSubmit(event) {
    event.preventDefault();
    console.log(this.state.medicineDetails);
    console.log(event.target.customer_name.value);
    console.log(event.target.address.value);
    console.log(event.target.phone.value);
    console.log(event.target.payment.value);
    console.log(event.target.rent.value);

    this.setState({ btnMessage: 1 });

    var customer_name = event.target.customer_name.value;
    var address = event.target.address.value;
    var phone = event.target.phone.value;
    var payment = event.target.payment.value;
    var rent = event.target.rent.value;

    
    var apiHandler = new APIHandler();
    var response = await apiHandler.generateBill(
      event.target.customer_name.value,
      event.target.address.value,
      event.target.phone.value,
      event.target.payment.value,
 
      
      this.state.medicineDetails
    );
    var response2 = await apiHandler.fetchBillDetails();
    
    console.log(response2);
    console.log(response2.data.data);
    let l= response2.data.data;

    let total_bill_id = l[l.length-1]["id"]+1;
      console.log(total_bill_id)
    this.setState({total_bill_id: total_bill_id});
 
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });

    this.billGeneratePrint(
      customer_name,
      address,
      phone,
      payment,
      rent, 
      this.state.medicineDetails,
      this.state.total_bill_id
    );
  }

  billGeneratePrint(customer_name, address, phone, payment,rent, medicineDetails,total_bill_id) {
    var billDetails = "<style> table{ width:100%;border-collapse:collapse; } td{ padding:5px } th { padding:5px } </style><div>";
    billDetails += "<table border='2' style='background:yellow;'>";
    billDetails += "<td style='text-align:center; font-weight:900;' colspan='8'>";
    billDetails += "MANGALESHWOR AGROVET SUPPLIERS </br> CHANDRAPUR-4, RAUTAHAT </br>TEL NO:055-540715, MOB: 9855040005, 9855041815";
    billDetails += "</td>";
    // billDetails += "</tr>";
    // billDetails += "<tr>";

    billDetails += "<tr>";
    billDetails += "<td  colspan='2'>";
    billDetails += "Invoice No: 2077/78";
    billDetails += "</td>";
    billDetails += "<td  colspan='2' style='text-align:center'>";
    billDetails += "PAN: 305291071"
    billDetails += "</td>";
    billDetails += "<td  colspan='2'>";
    billDetails += "Regd No: 1805/585-2070"
    billDetails += "</td>";
    billDetails += "<td  colspan='2'>";
    billDetails += "Bill No:" +total_bill_id;
    billDetails += "</td>";
    billDetails += "</tr>";

    billDetails += "<tr>";
    billDetails += "<td colspan='2'>";
    billDetails += "Name: " + customer_name;
    billDetails += "</td>";
    billDetails += "<td colspan='2'>";
    billDetails += "Address: " + address;
    billDetails += "</td>";
    billDetails += "<td colspan='2'>";
    billDetails += "Phone: " + phone;
    billDetails += "</td>";
    billDetails += "<td colspan='2'>";
    billDetails += "Payment: " + payment;
    billDetails += "</td>";
    billDetails += "</tr>";

    billDetails += "<tr>";
    billDetails += "<th>";
    billDetails += "SR NO .";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "Name .";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "QTY.";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "DISC.";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "QTY TYPE.";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "UNIT PRICE.";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "GST.";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "AMNT.";
    billDetails += "</th>";
    billDetails += "</tr>";
    var totalamt = 0;

    for (var i = 0; i < medicineDetails.length; i++) {
      billDetails += "<tr>";
      billDetails += "<td>";
      billDetails += "" + medicineDetails[i].sr_no;
      billDetails += "</td>";
      billDetails += "<td>";
      billDetails += "" + medicineDetails[i].medicine_name;
      billDetails += "</td>";
      billDetails += "<td>";
      billDetails += "" + medicineDetails[i].qty;
      billDetails += "</td>";
      billDetails += "<td>";
      billDetails += "" + medicineDetails[i].discount_amount;
      billDetails += "</td>";
      billDetails += "<td>";
      billDetails += "" + medicineDetails[i].qty_type;
      billDetails += "</td>";
      billDetails += "<td>";
      billDetails += "" + medicineDetails[i].unit_price;
      billDetails += "</td>";
      billDetails += "<td>";
      billDetails +=
        "" + medicineDetails[i].c_gst + " " + medicineDetails[i].s_gst;
      billDetails += "</td>";
      billDetails += "<td>";
      billDetails += "" + medicineDetails[i].amount;
      billDetails += "</td>";
      billDetails += "</tr>";
      totalamt += parseInt(medicineDetails[i].amount);
    }

    billDetails += "<tr>";
    billDetails += "<td colspan='7' style='text-align:right; font-weight:bold; color:black'>";
    billDetails += " Carrying Cost: ";
    billDetails += "</td>";
    billDetails += "<td  colspan='7'>";
    billDetails += + rent;
    billDetails += "</td>";
    billDetails += "</tr>";

    billDetails += "<tr>";
    billDetails +="<td colspan='7' style='text-align:right;font-weight:bold; color:black'>";
    billDetails += " Total Without Carrying Cost: ";
    billDetails += "</td>";
    billDetails += "<td colspan='7'>";
    billDetails += + totalamt;
    billDetails += "</td>";
    billDetails += "</tr>";

    billDetails += "<tr>";
    billDetails +="<td colspan='7' style='text-align:right;font-weight:bold; color:black'>";
    billDetails += " Total With Carrying Charge:";
    billDetails += "</td>";
    billDetails += "<td colspan='7'>";
    billDetails +=  + (parseFloat(totalamt)+parseFloat(rent));
    billDetails += "</td>";
    billDetails += "</tr>"

    billDetails += "<tr>";
    billDetails +="<td style='text-align:justify;font-weight:bold; color:black' colspan='8'>";
    billDetails += "If Payment not made with in 21 days interest @24% will be charged extra from the date of invoice. Our responsibility of any damage or shortage  cease after goods are handed over to the carrier against their receipt"
    billDetails += "</td>";
    billDetails += "</tr>"

    billDetails += "<tr height=50px >";
    billDetails += "<td style='text-align:left; padding-top:30px; font-weight:bold; color:black' colspan='3'>";
    billDetails += "Received By: .................";
    billDetails += "</td>";
    billDetails += "<td style='text-align:left;font-weight:bold; padding-top:30px; color:black' colspan='2'>";
    billDetails += "Checked By: .................";
    billDetails += "</td>";
    billDetails += "<td style='text-align:left; font-weight:bold; padding-top:30px; color:black' colspan='3'>";
    billDetails += "Authorized By: .................";
    billDetails += "</td>";
    billDetails += "</tr>"

    billDetails += "</table>";
    billDetails += "</div>";


    var mywindow = window.open(
      "",
      "Bill Print",
      "height=650&width=900&top=100&left=100"
    );

    mywindow.document.write(billDetails);
    mywindow.print();

  }

  AddMedicineDetails = () => {
    this.state.currentSrno = this.state.currentSrno + 1;
    var srno = this.state.currentSrno;
    this.state.medicineDetails.push({
      sr_no: srno,
      medicine_name: "",
      qty: "",
      discount_percentage:"",
      discount_amount:"",
      qty_type: "",
      unit_price: "",
      c_gst: "",
      s_gst: "",
      amount: "",
    });
    this.setState({});
  };

  RemoveMedicineDetails = () => {
    this.state.currentSrno = this.state.currentSrno - 1;
    if (this.state.medicineDetails.length > 1) {
      this.state.medicineDetails.pop();
    }
    this.setState({});
  };

  showDataInInputs = (index, item) => {
    console.log(index);
    console.log(item);
    console.log("showDAtaInINputs")
    this.state.medicineDetails[index].id = item.id;
    this.state.medicineDetails[index].qty = 1;
    this.state.medicineDetails[index].qty_type = "Pieces";
    this.state.medicineDetails[index].unit_price = item.sell_price;
    this.state.medicineDetails[index].c_gst = item.c_gst;
    this.state.medicineDetails[index].s_gst = item.s_gst;
    this.state.medicineDetails[index].medicine_name = item.name;
    this.state.medicineDetails[index].discount = 0;
    this.state.medicineDetails[index].before_disc_amount = 
    parseInt(item.sell_price) + parseInt(item.c_gst) + parseInt(item.s_gst);
    this.state.medicineDetails[index].amount =
      parseInt(item.sell_price) + parseInt(item.c_gst) + parseInt(item.s_gst);
    this.setState({});
  };
  rentChangeUpdate = (event) =>{
    var value = event.target.value;
  }
  qtyChangeUpdate = (event) => {
    var value = event.target.value;
    var index = event.target.dataset.index;
    console.log(index)
    let before_disc_amount =( parseInt(this.state.medicineDetails[index].unit_price) +
    parseInt(this.state.medicineDetails[index].c_gst) +
    parseInt(this.state.medicineDetails[index].s_gst)) *
  value;
    let discount_percentage = parseInt(this.state.medicineDetails[index].discount_percentage);
    let discount_amount =((discount_percentage/100)*before_disc_amount).toFixed(2);
    let amount = before_disc_amount - discount_amount;
    this.state.medicineDetails[index].amount = amount;
    this.state.medicineDetails[index].qty = value;
    this.state.medicineDetails[index].discount_amount = discount_amount;
    this.state.medicineDetails[index].before_disc_amount = before_disc_amount;
    this.setState({});
  };

  getDiscount=(event)=>{
    var value = event.target.value;
    var index = event.target.dataset.index;
    console.log("Hello")
    
    let discount_amount  = ((value/100 )* parseInt(this.state.medicineDetails[index].before_disc_amount)).toFixed(2);
    console.log("vefore dics"+this.state.medicineDetails[index].before_disc_amount)
    this.state.medicineDetails[index].amount =parseInt(this.state.medicineDetails[index].before_disc_amount)-discount_amount;
    this.state.medicineDetails[index].discount_amount = discount_amount;
    this.state.medicineDetails[index].discount_percentage = value;

    this.setState({});
    
  }

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Generate Bill</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Generate Bill for Customers</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <div className="row">
                      <div className="col-lg-6">
                        <label htmlFor="email_address">Customer Name :</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="customer_name"
                              name="customer_name"
                              className="form-control"
                              placeholder="Enter Customer Name "
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <label htmlFor="email_address">Address : </label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="address"
                              name="address"
                              className="form-control"
                              placeholder="Enter Address."
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6">
                        <label htmlFor="email_address">Phone :</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="Number"
                              id="phone"
                              name="phone"
                              className="form-control"
                              placeholder="Enter Customer Phone "
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <label htmlFor="email_address">Payment Type : </label>
                        <div className="form-group">
                          <div className="form-line">
                            <select
                              id="payment"
                              name="payment"
                              className="form-control"
                              placeholder="Enter Payment Type">
                                <option value="Cash">Cash</option>
                                <option value="Cheque">Cheque</option>
                                <option value="Credit">Credit</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                    <div className="col-lg-6">
                        <label htmlFor="email_address">Rent :</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="Number"
                              id="rent"
                              name="rent"
                              defaultValue="0"
                              className="form-control"
                              placeholder="Enter Rent "
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <br />
                    <h4>Medicine Details</h4>
                    {this.state.medicineDetails.map((item, index) => (
                      <div className="row" key={index}>
                        <div className="col-lg-1">
                          <label htmlFor="email_address">SR No : </label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="sr_no"
                                name="sr_no"
                                className="form-control"
                                placeholder="Enter SR No."
                                defaultValue={index + 1}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <label htmlFor="email_address">
                            Medicine Name :{" "}
                          </label>
                          <div className="form-group">
                            <div className="form-line">
                              <AutoCompleteMedicine
                                itemPostion={index}
                                showDataInInputs={this.showDataInInputs}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-1">
                          <label htmlFor="email_address">Qty : </label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="qty"
                                name="qty"
                                className="form-control"
                                placeholder="Enter Quantity."
                                defaultValue={item.qty}
                                data-index={index}
                                onChange={this.qtyChangeUpdate}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <label htmlFor="email_address">Discount : </label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="discount"
                                name="discount"
                                className="form-control"
                                placeholder="Enter Discount."
                                defaultValue="0"
                                defaultValue={item.discount_percentage}
                                data-index={index}
                                onChange={this.getDiscount}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <label htmlFor="email_address">Qty Type : </label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="qty_type"
                                name="qty_type"
                                className="form-control"
                                placeholder="Enter Qty Type."
                                defaultValue={item.qty_type}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <label htmlFor="email_address">Unit Price : </label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="unit_price"
                                name="unit_price"
                                className="form-control"
                                placeholder="Enter Unit Price."
                                defaultValue={item.unit_price}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <label htmlFor="email_address">Amount : </label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="amount"
                                name="amount"
                                className="form-control"
                                placeholder="Enter Amount"
                                defaultValue={item.amount}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="row">
                      <div className="col-lg-6">
                        <button
                          onClick={this.AddMedicineDetails}
                          className="btn btn-block btn-success"
                          type="button"
                        >
                          ADD MEDICINE DETAILS
                        </button>
                      </div>
                      <div className="col-lg-6">
                        <button
                          onClick={this.RemoveMedicineDetails}
                          className="btn btn-block btn-warning"
                          type="button"
                        >
                          REMOVE MEDICINE DETAILS
                        </button>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage == 0 ? false : true}
                    >
                      {this.state.btnMessage == 0
                        ? "Generate Bill"
                        : "Generating Bill Please Wait.."}
                    </button>
                    <br />
                    {this.state.errorRes == false &&
                    this.state.sendData == true ? (
                      <div className="alert alert-success">
                        <strong>Success!</strong> {this.state.errorMessage}.
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errorRes == true &&
                    this.state.sendData == true ? (
                      <div className="alert alert-danger">
                        <strong>Failed!</strong>
                        {this.state.errorMessage}.
                      </div>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default BillGenerateComponent;