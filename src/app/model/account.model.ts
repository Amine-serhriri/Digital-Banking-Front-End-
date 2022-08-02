export interface AccountDetails {
  account_id:           string;
  solde:                number;
  type:                 null;
  currentPage:          number;
  totalPages:           number;
  pageSize:             number;
  accountOperationDTOS: AccountOperationDTO[];
}

export interface AccountOperationDTO {
  id:            number;
  operationDate: Date;
  amount:         number;
  type:          string;
  description:   string;
}
