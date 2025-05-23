import { getSiswaPages } from "@/actions/siswa";
import PageContainer from "@/components/dashboard/page-container";
import TableSearch from "@/components/table/table-search";
import TablePagination from "@/components/table/table-pagination";

import { getKelass } from "@/actions/kelas";
import AbsensiTable from "./components/table-absensi";
import TableKelasFilter from "@/components/table/table-kelas-filter";
import UpdateTglBtn from "./components/update-tgl-button";

const AbsensiPage = async ({
    searchParams
}: {
    searchParams?: Promise<{query?: string; page?: string; nama_kelas?: undefined;}>;
}) => {
    const query = (await searchParams)?.query || "";
    const nama_kelas = (await searchParams)?.nama_kelas || undefined;
    const currentPage = Number((await searchParams)?.page) || 1;

    const totalPages = await getSiswaPages(query, nama_kelas);
    const {data} = await getKelass()
    
  return (
    <PageContainer scrollable>
      <div className="flex flex-col sm:flex-row items-start justify-between gap-6 mb-6">
        <TableSearch />
        <div className="flex items-center justify-between w-full">
          <TableKelasFilter dataKelas={data} nama_kelas={nama_kelas} />
          <UpdateTglBtn />
        </div>
      </div>
      <div key={query + currentPage}>
        <AbsensiTable
          query={query}
          currentPage={currentPage}
          nama_kelas={nama_kelas}
        />
      </div>
      <TablePagination totalPages={totalPages} />
    </PageContainer>
  );
};

export default AbsensiPage;