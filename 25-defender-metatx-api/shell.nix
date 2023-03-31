{ pkgs ? import <nixpkgs> { } }:
with pkgs;
mkShell {
  buildInputs = [
    # Node.js
    nodejs-16_x
    yarn
    jq
  ];
}
