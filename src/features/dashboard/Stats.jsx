import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendar, HiOutlineChartBar} from "react-icons/hi2"
function Stats({bookings,confirmStays,cabinCount,numDays}) {
    // 1.num of Bookings
    const numbookings=bookings.length;
    const sales=bookings.reduce((acc,curr)=>acc+curr.totalPrice,0);
    const checkins=confirmStays.length;
    const occupation=confirmStays.reduce((acc,curr)=>acc+curr.numNights,0)/(numDays*cabinCount);

    
    return (
        <>
            <Stat title="bookings" color="blue" value={numbookings}
             icon={<HiOutlineBriefcase></HiOutlineBriefcase>}></Stat>
            <Stat title="sales" color="green" value={formatCurrency(sales)}
             icon={<HiOutlineBanknotes></HiOutlineBanknotes>}></Stat>
            <Stat title="check-ins" color="indigo" value={checkins}
             icon={<HiOutlineCalendar></HiOutlineCalendar>}></Stat>
            <Stat title="Occupancy rate" color="yellow" value={Math.round(occupation*100)+"%"}
             icon={<HiOutlineChartBar></HiOutlineChartBar>}></Stat>
        </>
    )
}

export default Stats
