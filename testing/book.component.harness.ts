import { ComponentHarness, TestElement } from '@angular/cdk/testing';

export class BookComponentHarness extends ComponentHarness {
  static hostSelector = 'app-book';

  private title = this.locatorFor('.title');

  async getTitle(): Promise<string> {
    return (await this.title()).text();
  }
}
