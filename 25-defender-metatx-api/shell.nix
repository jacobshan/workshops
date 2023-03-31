{ pkgs ? import <nixpkgs> { } }:
with pkgs;
mkShell {
  buildInputs = [
    # Node.js
    nodejs-14_x
    yarn
    jq
  ];
}
