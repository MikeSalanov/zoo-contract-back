import { Request } from 'express';

type RequestExpressWithAdminType = Request & {
  adminLogin?: string
};

export default RequestExpressWithAdminType;
