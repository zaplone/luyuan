export default function SimplePage({ params }: { params: { locale: string } }) {
  return <h1>Locale: {params.locale}</h1>;
}