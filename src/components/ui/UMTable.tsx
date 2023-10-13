import { Table } from "antd";

type UMTableProps = {
  loading?: boolean;
  columns: any;
  dataSource?: any;
  pageSize?: number;
  totalPage?: number;
  showSizeChanger?: boolean;
  onPaginationChange?: (page: number, pageSize: number) => void;
  onTableChange?: (pagination: any, filter: any, sorter: any) => void;
  showPagination?: boolean;
};

const UMTable = ({
  loading = false,
  columns,
  dataSource,
  pageSize,
  totalPage,
  showSizeChanger = true,
  onPaginationChange,
  onTableChange,
  showPagination = true,
}: UMTableProps) => {
  const paginationConfig = showPagination
    ? {
        pageSize: pageSize,
        total: totalPage,
        pageSizeOptions: [5, 10, 15, 20],
        showSizeChanger: showSizeChanger,
        onChange: onPaginationChange,
      }
    : false;
  return (
    <Table
      onChange={onTableChange}
      loading={loading}
      dataSource={dataSource}
      columns={columns}
      pagination={paginationConfig}
    />
  );
};

export default UMTable;
