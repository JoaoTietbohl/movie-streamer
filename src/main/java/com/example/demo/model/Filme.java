package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "filme")  // corresponde exatamente à tabela no banco
public class Filme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String genero;
    private LocalDate lancamento;
    private String trailer;
    private String elenco_principal;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    private String diretor;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] imagem;  // <-- agora é byte[], não String

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getGenero() { return genero; }
    public void setGenero(String genero) { this.genero = genero; }

    public LocalDate getLancamento() { return lancamento; }
    public void setLancamento(LocalDate lancamento) { this.lancamento = lancamento; }

    public String getTrailer() { return trailer; }
    public void setTrailer(String trailer) { this.trailer = trailer; }

    public String getElenco_principal() { return elenco_principal; }
    public void setElenco_principal(String elenco_principal) { this.elenco_principal = elenco_principal; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getDiretor() { return diretor; }
    public void setDiretor(String diretor) { this.diretor = diretor; }

    public byte[] getImagem() { return imagem; }  // <-- correto agora
    public void setImagem(byte[] imagem) { this.imagem = imagem; }  // <-- correto agora
}
