// icon:newspaper | Entypo http://entypo.com/ | Daniel Bruce
import * as React from "react";

function IconPaper(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 800 1000"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M700 50c28 0 51.667 9.667 71 29s29 43 29 71v700c0 26.667-9.667 50-29 70s-43 30-71 30H100c-26.667 0-50-10-70-30S0 876.667 0 850V150c0-28 10-51.667 30-71s43.333-29 70-29h600m0 800V150H100v700h600M450 600v50H200v-50h250m150-200v50H400v-50h200m-200-50V250h200v100H400m-50-100v200H200V250h150m-50 250v50H200v-50h100m50 50v-50h250v50H350m250 150v50H200v-50h400m-100-50v-50h100v50H500" />
    </svg>
  );
}

export default IconPaper;
