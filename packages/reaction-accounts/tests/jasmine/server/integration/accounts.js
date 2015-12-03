const fakeUser = Factory.create("user");

describe("Account Meteor method ", function () {
  describe("addressBookAdd", function () {
    beforeEach(function () {
      return ReactionCore.Collections.Accounts.remove({});
    });

    it(
      "should throw 400 Match Failed error if the doc doesn't match the Address Schema",
      function (done) {
        const account = Factory.create("account");
        spyOn(ReactionCore.Collections.Accounts, "update");

        expect(function () {
          return Meteor.call("accounts/addressBookAdd", {}, account._id);
        }).toThrow();

        expect(ReactionCore.Collections.Accounts.update).not.toHaveBeenCalled();
        return done();
      });

    it(
      "should throw error if updated by user who doesn't own the account",
      function (done) {
        const account1 = Factory.create("account");
        const account2 = Factory.create("account");

        spyOn(Meteor, "userId").and.returnValue(account1._id);
        spyOn(ReactionCore.Collections.Accounts, "update");

        expect(function () {
          return Meteor.call("accounts/addressBookAdd", faker.reaction.address(),
            account2._id);
        }).toThrow();

        expect(ReactionCore.Collections.Accounts.update).toHaveBeenCalled();
        return done();
      });
  });

  describe("accounts/inviteShopMember", function () {
    it("should not let non-Owners invite a user to the shop", function (
      done) {
      const shopId = Factory.create("shop")._id;
      spyOn(ReactionCore, "hasOwnerAccess").and.returnValue(false);
      spyOn(Accounts, "createUser");
      // create user
      expect(function () {
        return Meteor.call("accounts/inviteShopMember", shopId,
          fakeUser.emails[0].address, fakeUser.profile.name);
      }).toThrow(new Meteor.Error(403, "Access denied"));
      // expect that createUser shouldnt have run
      expect(Accounts.createUser).not.toHaveBeenCalledWith({
        username: fakeUser.profile.name
      });
      return done();
    });

    // it("should let a Owner invite a user to the shop", function (done) {
    //   spyOn(ReactionCore, "hasOwnerAccess").and.returnValue(true);
    //   spyOn(Accounts, "createUser");
    //   const shopId = Factory.create("shop")._id;
    //
    //   expect(function () {
    //     return Meteor.call("accounts/inviteShopMember",
    //       shopId,
    //       fakeUser.emails[0].address,
    //       fakeUser.profile.name);
    //   }).not.toThrow(new Meteor.Error(403, "Access denied"));
    //
    //   expect(Accounts.createUser).toHaveBeenCalledWith({
    //     email: fakeUser.emails[0].address,
    //     username: fakeUser.profile.name
    //   });
    //   return done();
    // });
  });
});
