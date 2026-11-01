import Banner from "@/components/home/Banner";
import BookCategories from "@/components/home/BookCategories";
import HowItWorks from "@/components/home/HowItWorks";
import NewArrivals from "@/components/home/NewArrivals";

export default function Home() {
  return (
    <div>
      <Banner/>
      <NewArrivals/>
      <BookCategories/>
      <HowItWorks/>
    </div>
  );
}
