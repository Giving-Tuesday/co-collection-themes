import { Card as AfricanGivingTraditionsCard } from './african-giving-traditions';
import { Card as DatamartsCard } from './datamarts';
import { Card as DatasetsCard } from './datasets';
import { Card as GtrexCard } from './gtrex';
import { Card as GtdcCard } from './gtdc';
import { Card as PosterchildCard } from './posterchild';
import { Card as ProblemsSolutionsCard } from './problems-solutions';
import { Card as VizDatabaseCard } from './viz-database';
import { Card as TestTomCard } from './test-tom';

export const cardThemeEntries = [
  {
    themeName: ['african-giving-traditions'],
    CardComponent: AfricanGivingTraditionsCard,
  },
  { themeName: ['datamarts'], CardComponent: DatamartsCard },
  { themeName: ['datasets'], CardComponent: DatasetsCard },
  {
    themeName: ['giving-lab', 'givinglab', 'gtrex'],
    CardComponent: GtrexCard,
  },
  { themeName: ['gtdc', 'gtdc-projects'], CardComponent: GtdcCard },
  { themeName: ['posterchild'], CardComponent: PosterchildCard },
  { themeName: ['problems-solutions'], CardComponent: ProblemsSolutionsCard },
  { themeName: ['viz-database', 'viz-database-beta'], CardComponent: VizDatabaseCard },
  { themeName: ['test-tom'], CardComponent: TestTomCard },
];

export {
  AfricanGivingTraditionsCard,
  DatamartsCard,
  DatasetsCard,
  GtrexCard,
  GtdcCard,
  PosterchildCard,
  ProblemsSolutionsCard,
  VizDatabaseCard,
  TestTomCard,
};
