import { ItemPage as AfricanGivingTraditionsItemPage } from './african-giving-traditions';
import { ItemPage as DatamartsItemPage } from './datamarts';
import { ItemPage as DatasetsItemPage } from './datasets';
import { ItemPage as GtdcItemPage } from './gtdc';
import { ItemPage as GtrexItemPage } from './gtrex';
import { ItemPage as PosterchildItemPage } from './posterchild';
import { ItemPage as ProblemsSolutionsItemPage } from './problems-solutions';
import { ItemPage as VizDatabaseItemPage } from './viz-database';
import { ItemPage as TestTomItemPage } from './test-tom';

export const itemPageThemeEntries = [
  {
    themeName: ['african-giving-traditions'],
    ItemPageComponent: AfricanGivingTraditionsItemPage,
  },
  {
    themeName: ['datamarts'],
    ItemPageComponent: DatamartsItemPage,
  },
  {
    themeName: ['giving-lab', 'givinglab', 'gtrex'],
    ItemPageComponent: GtrexItemPage,
  },
  {
    themeName: ['datasets'],
    ItemPageComponent: DatasetsItemPage,
  },
  {
    themeName: ['gtdc', 'gtdc-projects'],
    ItemPageComponent: GtdcItemPage,
  },
  {
    themeName: ['posterchild'],
    ItemPageComponent: PosterchildItemPage,
  },
  {
    themeName: ['problems-solutions'],
    ItemPageComponent: ProblemsSolutionsItemPage,
  },
  {
    themeName: ['viz-database', 'viz-database-beta'],
    ItemPageComponent: VizDatabaseItemPage,
  },
  {
    themeName: ['test-tom'],
    ItemPageComponent: TestTomItemPage,
  },
];

export {
  AfricanGivingTraditionsItemPage,
  DatamartsItemPage,
  DatasetsItemPage,
  GtrexItemPage,
  GtdcItemPage,
  PosterchildItemPage,
  ProblemsSolutionsItemPage,
  VizDatabaseItemPage,
  TestTomItemPage,
};
