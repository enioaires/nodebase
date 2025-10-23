import { PAGINATION } from "@/config/constants";
import { parseAsInteger, parseAsString } from "nuqs/server";

const { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } = PAGINATION;

export const workflowsParams = {
  page: parseAsInteger
    .withDefault(DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),

  pageSize: parseAsInteger
    .withDefault(DEFAULT_PAGE_SIZE)
    .withOptions({ clearOnDefault: true }),

  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
};
