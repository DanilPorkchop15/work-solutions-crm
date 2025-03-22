import { useEffect, useState } from "react";
import type { PaginationParams } from "@frontend/shared/model/additionalRequestParams";
import type { UniqueEntity } from "@frontend/shared/model/interfaces";
import { isArray } from "@worksolutions/utils";
import type { TablePaginationConfig, TableProps } from "antd";
import { equals, isNil } from "ramda";

import type { TableModule } from "../model/tableModule";

export function convertDataToTableDataSource<D extends UniqueEntity>(data: D[]): (D & { key: string })[] {
  return data.map(raw => ({ ...raw, key: raw.id }));
}

export function createPaginationOnChangeHandlerFromPaginationParams(
  pagination: PaginationParams
): TablePaginationConfig["onChange"] {
  return (page: number, pageSize: number) => {
    pagination.setPageIndex(page);
    pagination.setPageSize(pageSize);
  };
}

export function createTableOnChangeHandlerFromTableModule<
  T extends object,
  F extends object = Record<string, unknown>,
  S extends string = never
>(tableModule: TableModule<T, F, S>): TableProps["onChange"] {
  return (pagination, filters, sorter) => {
    if (pagination.current) tableModule.pagination.setPageIndex(pagination.current);
    if (pagination.pageSize) tableModule.pagination.setPageSize(pagination.pageSize);

    for (const key in filters) {
      if (equals(tableModule.filter.state[key as keyof F], filters[key] as F[keyof F])) continue;
      if (isNil(filters[key]) && isNil(tableModule.filter.state[key as keyof F])) continue;
      tableModule.filter.set(key as keyof F, filters[key] as F[keyof F]);
    }

    if (!isArray(sorter)) {
      if (sorter.field && sorter.order) {
        tableModule.sorting.setParams(sorter.field as never, sorter.order === "descend");
      } else {
        tableModule.sorting.clear();
      }
    }
  };
}

export function useLocalTableOnChange<T>(rows: T[], pageIndex = 1, size = 10) {
  const [data, setData] = useState(rows);

  const [currentPage, setCurrentPage] = useState(pageIndex);
  const [pageSize, setPageSize] = useState(size);

  useEffect(() => {
    setData(rows);
  }, [rows]);

  const handleTableChange: TableProps<T>["onChange"] = (pagination, filters, sorter) => {
    const { current, pageSize } = pagination;
    setCurrentPage(current ?? 1);
    setPageSize(pageSize ?? 10);

    let sortedRows: T[] = [...rows];

    if (!Array.isArray(sorter) && sorter.columnKey) {
      sortedRows.sort((a, b) => {
        const field: keyof T = sorter.columnKey as keyof T;
        const order: number = sorter.order === "ascend" ? 1 : -1;

        if (a[field] < b[field]) return -order;
        if (a[field] > b[field]) return order;
        return 0;
      });
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.length > 0) {
        sortedRows = sortedRows.filter(item => value.includes(item[key as keyof T]));
      }
    });

    setData(sortedRows);
  };

  return {
    data,
    currentPage,
    pageSize,
    onChange: handleTableChange
  };
}
