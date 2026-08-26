import Hero from './components/Hero/Hero.';
import AboutMe from './components/AboutMe/AboutMe';
import Carrossel from './components/carrossel/Carrossel';
import Contact from './components/contact/Contact';
import { sanityClient } from './sanity';

export default async function Home() {
  const hero = await sanityClient.fetch(`
    *[_type == "hero"][0] {
      title,
      description1,
      description2
    }
  `);

  const aboutMe = await sanityClient.fetch(`
    *[_type == "aboutme"][0] {
      image,
      description,
      experience,
      education,
      languages,
      email,
      cellphone,
      skills
    }
  `);
  const portfolio = await sanityClient.fetch(`
  *[_type == "portfolio"][0] {
    title,
    subtitle,

    projects[] {
      _key,
      "id": _key,
      title,
      category,

      "cover": cover.asset->url,

      "images": images[defined(asset)][] {
        _key,
        "src": asset->url,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height
      }
    }
  }
`);

  const contato = await sanityClient.fetch(`
  *[_type == "contact"][0] {
    name,
    "image": image.asset->url,
    email,
    link1,
    link2,
    link3
  }
`);
  return (
    <>
      <Hero hero={hero} />
      <AboutMe aboutMe={aboutMe} />
      <Carrossel portfolio={portfolio} />
      <Contact contato={contato} />
    </>
  );
}
