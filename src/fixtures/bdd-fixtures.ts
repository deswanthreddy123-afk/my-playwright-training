import { test as base } from 'playwright-bdd';
import { LoginPage } from '../pages/login.page';
import { WellDetailsPage } from '../pages/Trajectory/well-details.page';
import { PlanVersionPage } from '../pages/Trajectory/plan-version.page';
import { WellPlanConsiderationPage } from '../pages/Trajectory/well-plan-consideration.page';
import { TargetsSizingPage } from '../pages/Trajectory/targets-sizing.page';
import { DirectionalPlotPage } from '../pages/Trajectory/directional-plot.page';
import { ThreeDPlotPage } from '../pages/Trajectory/three-d-plot.page';
import { CfLadderTcPlotPage } from '../pages/Trajectory/cf-ladder-tc-plot.page';
import { AntiCollisionOverviewPage } from '../pages/Trajectory/anti-collision-overview.page';
import { RiskAssessmentPage } from '../pages/Trajectory/risk-assessment.page';
import { WellPlanningChecklistPage } from '../pages/Trajectory/well-planning-checklist.page';
import { DesVerificationChecklistPage } from '../pages/Trajectory/des-verification-checklist.page';
import { OffsetWellDetailsPage } from '../pages/Offset Well Analysis/offset-well-details.page';
import { OffsetWellRunDetailsPage } from '../pages/Offset Well Analysis/offset-well-run-details.page';
import { DdrSummaryPage } from '../pages/Offset Well Analysis/ddr-summary.page';
import { NoDrillingSurprisesPage } from '../pages/Offset Well Analysis/no-drilling-surprises.page';
import { SectionObjectivesAndKpisPage } from '../pages/Engineering & Modeling/Drilling Engineering/section-objectives-and-kpis.page';
import { RiskManagementPrognosisPage } from '../pages/Engineering & Modeling/Drilling Engineering/risk-management-prognosis.page';

type Fixtures = {
  loginPage: LoginPage;
  wellDetailsPage: WellDetailsPage;
  planVersionPage: PlanVersionPage;
  wellPlanPage: WellPlanConsiderationPage;
  targetsSizingPage: TargetsSizingPage;
  directionalPlotPage: DirectionalPlotPage;
  threeDPlotPage: ThreeDPlotPage;
  cfPlotPage: CfLadderTcPlotPage;
  ladderPlotPage: CfLadderTcPlotPage;
  tcPlotPage: CfLadderTcPlotPage;
  antiCollisionOverviewPage: AntiCollisionOverviewPage;
  riskAssessmentPage: RiskAssessmentPage;
  wellPlanningChecklistPage: WellPlanningChecklistPage;
  desVerificationChecklistPage: DesVerificationChecklistPage;
  offsetWellDetailsPage: OffsetWellDetailsPage;
  offsetWellRunDetailsPage: OffsetWellRunDetailsPage;
  ddrSummaryPage: DdrSummaryPage;
  noDrillingSurprisesPage: NoDrillingSurprisesPage;
  sectionObjectivesAndKpisPage: SectionObjectivesAndKpisPage;
  riskManagementPrognosisPage: RiskManagementPrognosisPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  wellDetailsPage: async ({ page }, use) => {
    await use(new WellDetailsPage(page));
  },
  planVersionPage: async ({ page }, use) => {
    await use(new PlanVersionPage(page));
  },
  wellPlanPage: async ({ page }, use) => {
    await use(new WellPlanConsiderationPage(page));
  },
  targetsSizingPage: async ({ page }, use) => {
    await use(new TargetsSizingPage(page));
  },
  directionalPlotPage: async ({ page }, use) => {
    await use(new DirectionalPlotPage(page));
  },
  threeDPlotPage: async ({ page }, use) => {
    await use(new ThreeDPlotPage(page));
  },
  cfPlotPage: async ({ page }, use) => {
    await use(new CfLadderTcPlotPage(page, 'CF Plot'));
  },
  ladderPlotPage: async ({ page }, use) => {
    await use(new CfLadderTcPlotPage(page, 'Ladder Plot'));
  },
  tcPlotPage: async ({ page }, use) => {
    await use(new CfLadderTcPlotPage(page, 'TC Plot'));
  },
  antiCollisionOverviewPage: async ({ page }, use) => {
    await use(new AntiCollisionOverviewPage(page));
  },
  riskAssessmentPage: async ({ page }, use) => {
    await use(new RiskAssessmentPage(page));
  },
  wellPlanningChecklistPage: async ({ page }, use) => {
    await use(new WellPlanningChecklistPage(page));
  },
  desVerificationChecklistPage: async ({ page }, use) => {
    await use(new DesVerificationChecklistPage(page));
  },
  offsetWellDetailsPage: async ({ page }, use) => {
    await use(new OffsetWellDetailsPage(page));
  },
  offsetWellRunDetailsPage: async ({ page }, use) => {
    await use(new OffsetWellRunDetailsPage(page));
  },
  ddrSummaryPage: async ({ page }, use) => {
    await use(new DdrSummaryPage(page));
  },
  noDrillingSurprisesPage: async ({ page }, use) => {
    await use(new NoDrillingSurprisesPage(page));
  },
  sectionObjectivesAndKpisPage: async ({ page }, use) => {
    await use(new SectionObjectivesAndKpisPage(page));
  },
  riskManagementPrognosisPage: async ({ page }, use) => {
    await use(new RiskManagementPrognosisPage(page));
  },
});

export { expect } from '@playwright/test';
