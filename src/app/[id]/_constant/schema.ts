export interface Schema {
  [table: string]: {
    column_name: string;
    data_type: string;
  }[];
}

export const schema: Schema = {
  customers: [
    {
      column_name: 'customerId',
      data_type: 'smallint',
    },
    {
      column_name: 'name',
      data_type: 'varchar',
    },
    {
      column_name: 'contactLastName',
      data_type: 'varchar',
    },
    {
      column_name: 'contactFirstName',
      data_type: 'varchar',
    },
    {
      column_name: 'phone',
      data_type: 'varchar',
    },
    {
      column_name: 'addressLine1',
      data_type: 'varchar',
    },
    {
      column_name: 'addressLine2',
      data_type: 'varchar',
    },
    {
      column_name: 'city',
      data_type: 'varchar',
    },
    {
      column_name: 'state',
      data_type: 'varchar',
    },
    {
      column_name: 'postalCode',
      data_type: 'varchar',
    },
    {
      column_name: 'country',
      data_type: 'varchar',
    },
    {
      column_name: 'salesRepId',
      data_type: 'smallint',
    },
    {
      column_name: 'creditLimit',
      data_type: 'decimal',
    },
  ],
  customersperemployee: [
    {
      column_name: 'office',
      data_type: 'varchar',
    },
    {
      column_name: 'employee',
      data_type: 'varchar',
    },
    {
      column_name: 'jobTitle',
      data_type: 'varchar',
    },
    {
      column_name: 'customer',
      data_type: 'varchar',
    },
  ],
  employees: [
    {
      column_name: 'employeeId',
      data_type: 'smallint',
    },
    {
      column_name: 'lastName',
      data_type: 'varchar',
    },
    {
      column_name: 'firstName',
      data_type: 'varchar',
    },
    {
      column_name: 'extension',
      data_type: 'varchar',
    },
    {
      column_name: 'email',
      data_type: 'varchar',
    },
    {
      column_name: 'officeCode',
      data_type: 'varchar',
    },
    {
      column_name: 'managerId',
      data_type: 'smallint',
    },
    {
      column_name: 'jobTitle',
      data_type: 'varchar',
    },
    {
      column_name: 'birthDate',
      data_type: 'date',
    },
  ],
  noofcustomersperemployee: [
    {
      column_name: 'office',
      data_type: 'varchar',
    },
    {
      column_name: 'employee',
      data_type: 'varchar',
    },
    {
      column_name: 'jobTitle',
      data_type: 'varchar',
    },
    {
      column_name: 'noOfCustomers',
      data_type: 'bigint',
    },
  ],
  offices: [
    {
      column_name: 'officeCode',
      data_type: 'varchar',
    },
    {
      column_name: 'city',
      data_type: 'varchar',
    },
    {
      column_name: 'phone',
      data_type: 'varchar',
    },
    {
      column_name: 'addressLine1',
      data_type: 'varchar',
    },
    {
      column_name: 'addressLine2',
      data_type: 'varchar',
    },
    {
      column_name: 'state',
      data_type: 'varchar',
    },
    {
      column_name: 'country',
      data_type: 'varchar',
    },
    {
      column_name: 'postalCode',
      data_type: 'varchar',
    },
    {
      column_name: 'territory',
      data_type: 'varchar',
    },
  ],
  orderDetails: [
    {
      column_name: 'orderNo',
      data_type: 'smallint',
    },
    {
      column_name: 'productCode',
      data_type: 'varchar',
    },
    {
      column_name: 'quantity',
      data_type: 'smallint',
    },
    {
      column_name: 'priceEach',
      data_type: 'decimal',
    },
    {
      column_name: 'orderLineNo',
      data_type: 'tinyint',
    },
  ],
  orders: [
    {
      column_name: 'orderNo',
      data_type: 'smallint',
    },
    {
      column_name: 'orderDate',
      data_type: 'date',
    },
    {
      column_name: 'requiredDate',
      data_type: 'date',
    },
    {
      column_name: 'shippedDate',
      data_type: 'date',
    },
    {
      column_name: 'status',
      data_type: 'enum',
    },
    {
      column_name: 'comments',
      data_type: 'text',
    },
    {
      column_name: 'customerId',
      data_type: 'smallint',
    },
  ],
  payments: [
    {
      column_name: 'customerId',
      data_type: 'smallint',
    },
    {
      column_name: 'checkNo',
      data_type: 'varchar',
    },
    {
      column_name: 'paymentDate',
      data_type: 'date',
    },
    {
      column_name: 'amount',
      data_type: 'decimal',
    },
  ],
  productLines: [
    {
      column_name: 'productLine',
      data_type: 'varchar',
    },
    {
      column_name: 'description',
      data_type: 'varchar',
    },
    {
      column_name: 'htmlDescription',
      data_type: 'mediumtext',
    },
    {
      column_name: 'image',
      data_type: 'mediumblob',
    },
  ],
  products: [
    {
      column_name: 'productCode',
      data_type: 'varchar',
    },
    {
      column_name: 'name',
      data_type: 'varchar',
    },
    {
      column_name: 'productLine',
      data_type: 'varchar',
    },
    {
      column_name: 'scale',
      data_type: 'varchar',
    },
    {
      column_name: 'vendor',
      data_type: 'varchar',
    },
    {
      column_name: 'description',
      data_type: 'text',
    },
    {
      column_name: 'quantityInStock',
      data_type: 'smallint',
    },
    {
      column_name: 'buyPrice',
      data_type: 'decimal',
    },
    {
      column_name: 'MSRP',
      data_type: 'decimal',
    },
  ],
  sales: [
    {
      column_name: 'orderNo',
      data_type: 'smallint',
    },
    {
      column_name: 'productCode',
      data_type: 'varchar',
    },
    {
      column_name: 'productName',
      data_type: 'varchar',
    },
    {
      column_name: 'productLine',
      data_type: 'varchar',
    },
    {
      column_name: 'orderYear',
      data_type: 'year',
    },
    {
      column_name: 'orderValue',
      data_type: 'bigint',
    },
  ],
};
