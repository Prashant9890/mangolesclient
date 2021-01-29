class Config {
  //BASE_URL = "https://medicalstoreapi.herokuapp.com/";
  static loginUrl = " https://mangaleshworagrovet.com/api/gettoken/";
  static refreshApiUrl = "https://mangaleshworagrovet.com/api/resfresh_token/";
  static companyApiUrl = "https://mangaleshworagrovet.com/api/company/";
  static homeApiUrl = "https://mangaleshworagrovet.com/api/home_api/";
  static customerRequestApiUrl = "https://mangaleshworagrovet.com/api/customer_request/";
  static medicineNameApiUrl = "https://mangaleshworagrovet.com/api/medicinebyname/";
  static companyBankApiUrl = "https://mangaleshworagrovet.com/api/companybank/";
  static generateBillApiUrl = "https://mangaleshworagrovet.com/api/generate_bill_api/";
  static companyAccountApiUrl = "https://mangaleshworagrovet.com/api/companyaccount/";
  static companyOnly = "https://mangaleshworagrovet.com/api/companyonly/";
  static employeeApiURL = "https://mangaleshworagrovet.com/api/employee/";
  static medicineApiUrl = "https://mangaleshworagrovet.com/api/medicine/";
  static employeeBankApiUrl = "https://mangaleshworagrovet.com/api/employee_all_bank/";
  static employeeBankApiUrlBYID = "https://mangaleshworagrovet.com/api/employee_bankby_id/";
  static employeeSalaryApiUrl ="https://mangaleshworagrovet.com/api/employee_all_salary/";
  static employeeSalaryByIdApiUrl = "https://mangaleshworagrovet.com/api/employee_salaryby_id/";
  static billDetails = " https://mangaleshworagrovet.com/api/billdetails/";



  static homeUrl = "/home";
  static logoutPageUrl = "/logout";

  static sidebarItem = [
    { index: "0", title: "Home", url: "/home", icons: "home" },
    { index: "1", title: "Company", url: "/company", icons: "assessment" },
    {
      index: "2",
      title: "Add Medicine",
      url: "/addMedicine",
      icons: "assessment",
    },
    {
      index: "3",
      title: "Manage Medicine",
      url: "/manageMedicine",
      icons: "assessment",
    },
    {
      index: "4",
      title: "Manage Company Account",
      url: "/manageCompanyAccount",
      icons: "assessment",
    },
    {
      index: "5",
      title: "Manage Employee",
      url: "/employeeManage",
      icons: "assessment",
    },
    {
      index: "6",
      title: "Generate Bill",
      url: "/generateBill",
      icons: "assessment",
    },
    {
      index: "7",
      title: "Customer Request",
      url: "/customerRequest",
      icons: "assessment",
    },
  ];
}

export default Config;
