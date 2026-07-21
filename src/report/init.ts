/**
 * Report Initialization
 */

export class ReportConfig {
  static readonly OUTPUT_DIR = './playwright-report';
  static readonly SCREENSHOTS_DIR = `${this.OUTPUT_DIR}/screenshots`;
  static readonly VIDEOS_DIR = `${this.OUTPUT_DIR}/videos`;
  static readonly TRACES_DIR = `${this.OUTPUT_DIR}/traces`;
}
