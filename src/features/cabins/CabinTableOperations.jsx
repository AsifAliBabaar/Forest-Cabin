import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filteredField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort By name (A-Z)" },
          { value: "name-desc", label: "Sort By name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort By Price (low First)" },
          { value: "regularPrice-desc", label: "Sort By Price (high First)" },
          { value: "maxCapacity-asc", label: "Sort By Capacity (low First)" },
          { value: "maxCapacity-desc", label: "Sort By Capacity (high First)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
