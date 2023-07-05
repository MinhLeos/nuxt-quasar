import listProduct from "@/assets/data/listProduct.json";
import { compareValues } from '@/utils/sort.ts';

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const pageSize = query?.pageSize ? +query.pageSize : 10;
    const currentPage = query?.currentPage ? +query.currentPage : 1;
    const sortValue = query?.sortValue || '';
    const isAsc = query?.isAsc === 'true';
    const start = (currentPage - 1) * pageSize;
    const end = currentPage * pageSize;
    let result = [];
    let length = 0;

    if (!sortValue) {
        result = (listProduct || []).slice(start, end);
        length = (listProduct || []).length;
    } else {
        const listData = listProduct.sort(compareValues(sortValue, isAsc));
        result = (listData || []).slice(start, end);
        length = (listData || []).length;
    }
    result = result.map(rs => {
        return {
            ...rs,
            isSelect: false
        }
    });
    return {
        products: result,
        total: length
    }
});