import { MaterialSymbol } from "react-material-symbol-icons";
import { Container } from "@/components/_ui/Container";

const featureClass =
  "text-foreground hover:scale-105 text-xs md:text-base text-center transition shadow-lg shadow-blue-400/50 rounded-xl drop-shadow-xl p-4 h-full flex flex-col justify-center items-center";

export function FeaturesSection() {
  return (
    <Container size="lg">
      <h2 className="max-w-6xl mx-auto text-4xl md:text-6xl text-center mb-12">
        So what&apos;s included in NextGen News?
      </h2>

      <p className="text-center text-lg md:text-2xl max-w-2xl mx-auto mb-12">
        NextGen News includes the features that I believe are essential for a
        news app to be user-friendly, engaging, and informative
      </p>

      <ul className="md:max-w-6xl mx-auto grid grid-cols-3 md:px-12 leading-10 gap-6">
        <div className="flex flex-col gap-6">
          <li className={featureClass}>
            <MaterialSymbol icon="globe" /> Discover news from around the world
          </li>
          <li className={featureClass}>
            <MaterialSymbol icon="filter_list" /> Filter news by section
          </li>
        </div>
        <div className="flex flex-col gap-6">
          <li className={featureClass}>
            <MaterialSymbol icon="favorite" />
            Save your favorite news
          </li>
          <li className={featureClass}>
            <MaterialSymbol icon="dashboard_customize" /> Personalize your news
            feed
          </li>
        </div>
        <div className="flex flex-col gap-6">
          <li className={featureClass}>
            <MaterialSymbol icon="share" /> Share news with friends
          </li>
          <li className={featureClass}>
            <MaterialSymbol icon="responsive_layout" />
            Responsive design
          </li>
        </div>
      </ul>
    </Container>
  );
}
