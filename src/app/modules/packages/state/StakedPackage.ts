import { computed } from "mobx";

import { IStakedPackageData } from "app/shared/typings";
import PackageStore from "./PackageStore";
import PackageBase from "./PackageBase";

class StakedPackage extends PackageBase<IStakedPackageData> {
  constructor(data: IStakedPackageData, packageStore: PackageStore) {
    super(data, packageStore);
  }

  @computed get dappPackage() {
    const dappPackage = this.packageStore.dappPackages.find(dappPackage => {
      return dappPackage.providerLowercased === this.providerLowercased
        && dappPackage.serviceLowercased === this.serviceLowercased
        && dappPackage.packageId === this.packageId
    })
    return dappPackage
  }

  @computed get quotaNumber() {
    return this.data.quota;
  }

  @computed get minStakeNumber() {
    if(!this.dappPackage) return 0
    return this.dappPackage.minStakeNumber
  }

  @computed get minUnstakePeriod() {
    if(!this.dappPackage) return 0
    return this.dappPackage.minUnstakePeriod
  }

  @computed get packageId() {
    // `selectpkg` action sets pending_package
    // if enough staked through `stake` action, package is set to pending_package
    // so package field is the current active package, pending the selected one
    return this.data.package || this.data.pending_package;
  }
}

export default StakedPackage;