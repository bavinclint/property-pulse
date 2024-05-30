import PropertySearchForm from '@/components/PropertySearchForm';
import Properties from '@/components/Properties';

const PropertiesPage = async () => {
  return (
    <>
      <section className='bg-main py-4'>
        <div className='max-w-7xl mx-auto px-4 mt-16 flex flex-col items-start sm:px-6 lg:px-8'>
          <PropertySearchForm />
        </div>
      </section>
      <Properties />
    </>
  );
};
export default PropertiesPage;
