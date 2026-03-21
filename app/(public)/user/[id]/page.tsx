import BackButton from 'src/features/recipe-details/BackButton';

export default function Page({ user }) {
  return (
    <div className="body__container-lg flex flex-col gap-y-5 py-6">
      <BackButton />
      <UserProfileHeader user={user} />
      {/* other content */} 
    </div>
  );
}