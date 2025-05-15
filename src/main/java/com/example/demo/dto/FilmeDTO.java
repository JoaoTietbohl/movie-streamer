package com.example.demo.dto;

import com.example.demo.model.Filme;

public class FilmeDTO {
    private Long id;
    private String nome;
    private String genero;
    private String diretor;
    private String trailer;
    private String elenco_principal;
    private String descricao;
    private String imagemUrl;

    public FilmeDTO(Filme filme) {
        this.id = filme.getId();
        this.nome = filme.getNome();
        this.genero = filme.getGenero();
        this.diretor = filme.getDiretor();
        this.trailer = filme.getTrailer();
        this.elenco_principal = filme.getElenco_principal();
        this.descricao = filme.getDescricao();
        this.imagemUrl = "http://localhost:8080/filmes/" + filme.getId() + "/imagem";
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getGenero() { return genero; }
    public String getDiretor() { return diretor; }
    public String getTrailer() { return trailer; }
    public String getElenco_principal() { return elenco_principal; }
    public String getDescricao() { return descricao; }
    public String getImagemUrl() { return imagemUrl; }
}
